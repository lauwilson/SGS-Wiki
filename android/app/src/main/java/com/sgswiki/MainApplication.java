package com.sgswiki;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import io.realm.react.RealmReactPackage;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public void onCreate() {
    super.onCreate();

    Context context = getApplicationContext();
    SharedPreferences preferences = context.getSharedPreferences("com.sgswiki_preferences", MODE_PRIVATE);
    if (!preferences.getBoolean("RealmInitialized", false)) {
      boolean realmInitSuccess = copyBundledRealmFile(getResources().openRawResource(R.raw.sgswiki), "sgswiki.realm");
      if (realmInitSuccess) {
        preferences.edit().putBoolean("RealmInitialized", true).commit();
      }
    }
  }

  private boolean copyBundledRealmFile(InputStream inputStream, String outputFileName) {
    try {
      File file = new File(this.getFilesDir(), outputFileName);
      FileOutputStream outputStream = new FileOutputStream(file);
      byte[] buf = new byte[1024];
      int bytesRead;
      while ((bytesRead = inputStream.read(buf)) > 0) {
        outputStream.write(buf, 0, bytesRead);
      }
      outputStream.close();
      return true;
    } catch (IOException e) {
      e.printStackTrace();
    }
    return false;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RealmReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
