package fr.lesastres.eric;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebChromeClient;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.content.Context;
import android.webkit.JavascriptInterface;

public class MainActivity extends Activity {
 private WebView web;
 @Override public void onCreate(Bundle state) {
  super.onCreate(state);
  web = new WebView(this);
  web.setBackgroundColor(0xff071324);
  web.getSettings().setJavaScriptEnabled(true);
  web.getSettings().setAllowFileAccess(true); // Required for bundled android_asset resources
  web.getSettings().setAllowFileAccessFromFileURLs(false);
  web.getSettings().setAllowUniversalAccessFromFileURLs(false);
  web.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
  web.getSettings().setAllowContentAccess(false);
  web.getSettings().setDomStorageEnabled(false);
  web.getSettings().setJavaScriptCanOpenWindowsAutomatically(false);
  web.setWebViewClient(new WebViewClient() {
   @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
    String url = request.getUrl().toString();
    return !url.startsWith("file:///android_asset/");
   }
   @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
    return !url.startsWith("file:///android_asset/");
   }
  });
  web.setWebChromeClient(new WebChromeClient());
  web.addJavascriptInterface(new Bridge(), "AstresAndroid");
  setContentView(web);
  web.loadUrl("file:///android_asset/index.html");
 }
 public class Bridge {
  @JavascriptInterface public void printPdf() {
   runOnUiThread(() -> {
    PrintManager manager = (PrintManager)getSystemService(Context.PRINT_SERVICE);
    manager.print("Les Astres d'Éric - thème astrologique", web.createPrintDocumentAdapter("theme-astral"), new PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.ISO_A4).build());
   });
  }
 }
 @Override public void onBackPressed() { if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
