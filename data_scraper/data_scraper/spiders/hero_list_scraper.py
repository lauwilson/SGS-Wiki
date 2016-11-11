import scrapy
import re
import os
import urllib
import logging
logging.basicConfig(filename='results_hero_list.log')

class HeroListSpider(scrapy.Spider):
    name = "hero_list"

    start_urls = [
     'http://sanguoshaenglish.blogspot.ca/2010/02/kw-characters.html'
    ]

    # Set scraping limits just in case.
    custom_settings = {
        'CONCURRENT_REQUESTS': 8,
        'CONCURRENT_REQUESTS_PER_DOMAIN' : 1,
        #'DOWNLOAD_DELAY' : 1,
        'ITEM_PIPELINES' : {'data_scraper.pipelines.SaveToJsonPipeline': 300 }
    }

    def parse(self, response):
        """
        Main parse function for the spider. Generates the list of heroes and associated URLs.
        Sends each hero request to the parseHero function for scraping.

        Args:
            response    :   The HTTP response from the initial request to the start_url.
        """

        FACTION_REGEX = re.compile("<b>(\S+) .+<\/b>")

        # Enumerate over the Scrapy Selectors and not the extracted text so we can use CSS selectors
        # later to retrieve the individual links easily.
        enumeratedSections = enumerate(response.css('div.post-body b, div.post-body div.separator'))
        for idx, section in enumeratedSections:
            match = FACTION_REGEX.match(section.extract())
            if match is not None:
                # get the faction name, so we can inject it into the JSON later
                faction = match.group(1)
                nextIdx, heroList = enumeratedSections.__next__()
                heroURLs = heroList.css('div.separator a::attr(href)').extract()
                for url in heroURLs:
                    # submit a request for each URL
                    # on response, send it to the hero_details parser, and inject the faction
                    request = scrapy.Request(url, self.parseHero)
                    request.meta['faction'] = faction
                    yield request

    def parseHero(self, response):
        """
        Parse function used to extract hero data.

        Args:
            response    :   The response from the HTTP request to the specific hero's page.
        """

        hero = Hero()
        # Rename Heroes to Neutral faction due to weird naming result.
        # e.g. "Heroes Heroes" -> "Neutral Heroes"
        faction = response.meta['faction']
        hero['faction'] = 'Neutral' if faction == 'Heroes' else faction

        hero['name'] = response.css('div.bposttitle h2.post-title a::text').extract_first()

        # Use the html page as the key for DB access later on.
        match = re.match(".+\/([^\/].+)(\.(html|htm))", response.url)
        if match is not None:
            hero['key'] = match.group(1)

        # Note: Some pages contain hidden new-lines, therefore we need to cleanse the input before enumerating over
        #       the results.
        hero_data = PeekableList([x.strip('\n') for x in response.css('div.post-body').extract()[0].split("<br>")])
        self.fill_hero_details(hero, hero_data)
        self.saveHeroImage(response, hero['key'])

        return hero

    def fill_hero_details(self, hero, splitHeroInfo):
        """
        Populates a Hero object with the scraped Hero information from the website.

        The hero information is relatively unstructured, such that all information exists
        inside a single <div> tag as a block of text separated by <br> line breaks.

        Parsing the details involve finding sections of text which can be identified as titles
        and then grouping it with the subsequent sections until another title section is reached.

        Args:
            hero            :   the object which will contain all the parsed data. Some data members may be
                                pre-populated with data.
            splitHeroInfo   :   a PeekableList of strings containing <b> tags, empty strings, and text
                                which represent the hero's details. These details will populate
                                the hero object.
        """

        title_regex = re.compile('^(<b>)(.+)(</b>)')
        ability_regex = re.compile('<b>Character ability[^\"\u201c]+((\"|\u201c).*)<\/b>')
        partners_regex = re.compile('<b>Synergistic Partners:<\/b>')

        for section in splitHeroInfo:
            if title_regex.match(section) is not None:
                # is it an ability title?
                match = ability_regex.match(section)
                if match is not None:
                    ability_name = match.group(1).strip().replace('\"', '') \
                                                         .replace('\u201c', '') \
                                                         .replace('\u201d', '')
                    keepLooping = True
                    ability_desc = ''
                    while keepLooping:
                        if title_regex.match(splitHeroInfo.peek()) is not None:
                            keepLooping = False
                        else:
                            line = splitHeroInfo.__next__()
                            ability_desc += (line + '\n') if line != '' else '\n'

                    ability_desc = ability_desc.rstrip('\n')
                    hero['abilities'].append({"name" : ability_name, "description" : ability_desc})
                else:
                    # is the title for synergy partners?
                    match = partners_regex.match(section)
                    if match != None:
                        # each non-empty line before the next title will be a partner
                        nextString = splitHeroInfo.__next__()
                        while title_regex.match(nextString) is None:
                            if nextString != "":
                                hero['partners'].append(nextString)
                            nextString = splitHeroInfo.__next__()

    def saveHeroImage(self, response, heroKey):
        """
        Saves the hero's image if it is not already on the local filesystem.

        Args:
            response    :   The response from the HTTP request to the hero's page.
            heroKey     :   The key used to look up the existence of the local image.
        """

        if heroKey == '':
            logging.error(">>> Key is empty. Cannot search for image")
            return

        image_folder = "../../../images/"
        if not os.path.exists(image_folder):
            os.mkdir(image_folder)

        local_image_path = image_folder + heroKey + ".jpg"
        if not os.path.exists(local_image_path):
            image_url = response.css('div.post-body div.separator a img::attr(src)').extract()[0]
            urllib.request.urlretrieve(image_url, local_image_path)
            logging.info(">>> Local image not found: Saved remote image to " + local_image_path)
        else:
            logging.info(">>> " + local_image_path + " already exists.")

class PeekableList:
    """
        Custom iterable list wrapper which allows the user to peek one element ahead.
    """
    def __init__(self, list):
        """
            Constructor for PeekableList.

            Args:
                list    :   The list to iterate over.
        """
        self.data = list
        self.maxIdx = len(self.data) - 1
        self.currentIdx = -1
    def __iter__(self):
        return self
    def __next__(self):
        """
            Points the iterator to the next element and returns the element.

            Returns: The next element.
            Raises: StopIteration exception if __next__() progresses past the list.
        """
        if (self.currentIdx == self.maxIdx):
            raise StopIteration
        self.currentIdx += 1
        return self.data[self.currentIdx]

    def peek(self):
        """
            Looks at the next upcoming element.

            Returns: The next element, or None if at end of list.
        """
        return None if (self.currentIdx == self.maxIdx) else self.data[self.currentIdx + 1]

class Hero(scrapy.Item):
    key = scrapy.Field()
    name = scrapy.Field()
    faction = scrapy.Field()
    abilities = scrapy.Field()
    partners = scrapy.Field()

    def __init__(self):
        super().__init__()
        self.setdefault('key', '')
        self.setdefault('name', '')
        self.setdefault('faction', '')
        self.setdefault('abilities', [])
        self.setdefault('partners', [])
