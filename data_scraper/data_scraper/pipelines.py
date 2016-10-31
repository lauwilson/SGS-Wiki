# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from scrapy.exporters import JsonItemExporter
import os

class DataScraperPipeline(object):
    def process_item(self, item, spider):
        return item

class SaveToJsonPipeline(object):
    outputDir = '../output/'

    def open_spider(self, spider):
        os.makedirs(self.outputDir, exist_ok=True)
        self.output = open(self.outputDir + 'heroes.json', 'w+b')
        self.exporter = JsonItemExporter(self.output, ensure_ascii=False)
        self.exporter.start_exporting()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.output.close()
