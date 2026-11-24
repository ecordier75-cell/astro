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
  private String requestGemini(String key, String model, String prompt) {
   javax.net.ssl.HttpsURLConnection conn = null;
   try {
    if (!model.matches("gemini-[a-zA-Z0-9.\\-]+") || key.length()>512 || prompt.length()>60000) throw new Exception("Paramètres invalides");
    conn = (javax.net.ssl.HttpsURLConnection)new java.net.URL("https://generativelanguage.googleapis.com/v1beta/models/"+model+":generateContent").openConnection();
    conn.setInstanceFollowRedirects(false); conn.setConnectTimeout(15000); conn.setReadTimeout(120000);
    conn.setRequestMethod("POST"); conn.setDoOutput(true); conn.setRequestProperty("Content-Type","application/json"); conn.setRequestProperty("x-goog-api-key",key);
    org.json.JSONObject body = new org.json.JSONObject().put("contents",new org.json.JSONArray().put(new org.json.JSONObject().put("parts",new org.json.JSONArray().put(new org.json.JSONObject().put("text",prompt)))));
    try(java.io.OutputStream out=conn.getOutputStream()){out.write(body.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));}
    int status=conn.getResponseCode();
    if(status!=200){
     String detail="";
     try(java.io.InputStream in=conn.getErrorStream(); java.io.ByteArrayOutputStream out=new java.io.ByteArrayOutputStream()){
      if(in!=null){byte[] buf=new byte[2048];int n;while((n=in.read(buf))!=-1 && out.size()<65536)out.write(buf,0,n);
       org.json.JSONObject err=new org.json.JSONObject(out.toString("UTF-8")).optJSONObject("error");
       if(err!=null)detail=err.optString("status")+" : "+err.optString("message");}
     }catch(Exception ignored){}
     return new org.json.JSONObject().put("error","Gemini HTTP "+status+" — "+detail.replace(key,"[clé masquée]")).toString();
    }
    try(java.io.InputStream in=conn.getInputStream(); java.io.ByteArrayOutputStream out=new java.io.ByteArrayOutputStream()){byte[] buf=new byte[4096];int n;while((n=in.read(buf))!=-1){out.write(buf,0,n);if(out.size()>2000000)throw new Exception("Réponse trop volumineuse");}return out.toString("UTF-8");}
   }catch(Exception e){return "{\"error\":\"Connexion impossible ou délai dépassé.\"}";}finally{if(conn!=null)conn.disconnect();}
  }

  @JavascriptInterface public void gemini(String key,String model,String prompt,String id){
   if(!id.matches("[0-9]+"))return;
   new Thread(()->{String result=requestGemini(key,model,prompt);runOnUiThread(()->web.evaluateJavascript("window.receiveGemini("+id+","+org.json.JSONObject.quote(result)+")",null));}).start();
  }
  @JavascriptInterface public void printPdf() {
   runOnUiThread(() -> {
    PrintManager manager = (PrintManager)getSystemService(Context.PRINT_SERVICE);
    manager.print("Les Astres d'Éric - thème astrologique", web.createPrintDocumentAdapter("theme-astral"), new PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.ISO_A4).build());
   });
  }
 }
 @Override public void onBackPressed() { if(web.canGoBack()) web.goBack(); else super.onBackPressed(); }
}
