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
 private byte[] studioPng;
 @Override protected void onActivityResult(int requestCode,int resultCode,android.content.Intent data){
  super.onActivityResult(requestCode,resultCode,data);
  if(requestCode!=741)return;
  byte[] bytes=studioPng;studioPng=null;
  if(resultCode!=RESULT_OK||data==null||data.getData()==null||bytes==null)return;
  try(java.io.OutputStream out=getContentResolver().openOutputStream(data.getData())){if(out==null)throw new java.io.IOException();out.write(bytes);android.widget.Toast.makeText(this,"PNG enregistré",android.widget.Toast.LENGTH_LONG).show();}catch(Exception e){android.widget.Toast.makeText(this,"Enregistrement impossible",android.widget.Toast.LENGTH_LONG).show();}
 }

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
    if (url.equals("https://aistudio.google.com/apikey")) {
     try { startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url))); } catch (android.content.ActivityNotFoundException e) { android.widget.Toast.makeText(MainActivity.this, "Ouvrez aistudio.google.com/apikey dans votre navigateur.", android.widget.Toast.LENGTH_LONG).show(); }
     return true;
    }
    return !url.startsWith("file:///android_asset/");
   }
   @Override public boolean shouldOverrideUrlLoading(WebView view, String url) {
    if (url.equals("https://aistudio.google.com/apikey")) {
     try { startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url))); } catch (android.content.ActivityNotFoundException e) { android.widget.Toast.makeText(MainActivity.this, "Ouvrez aistudio.google.com/apikey dans votre navigateur.", android.widget.Toast.LENGTH_LONG).show(); }
     return true;
    }
    return !url.startsWith("file:///android_asset/");
   }
  });
  web.setWebChromeClient(new WebChromeClient());
  web.addJavascriptInterface(new Bridge(), "AstresAndroid");
  setContentView(web);
  web.loadUrl("file:///android_asset/index.html");
 }
 private static final String KEY_ALIAS = "astres_gemini_v1";
 private javax.crypto.SecretKey storageKey(boolean create) throws Exception {
  java.security.KeyStore ks=java.security.KeyStore.getInstance("AndroidKeyStore"); ks.load(null);
  if(ks.containsAlias(KEY_ALIAS)) return (javax.crypto.SecretKey)ks.getKey(KEY_ALIAS,null);
  if(!create) throw new java.security.KeyStoreException("Missing key");
  javax.crypto.KeyGenerator gen=javax.crypto.KeyGenerator.getInstance("AES","AndroidKeyStore");
  gen.init(new android.security.keystore.KeyGenParameterSpec.Builder(KEY_ALIAS, android.security.keystore.KeyProperties.PURPOSE_ENCRYPT | android.security.keystore.KeyProperties.PURPOSE_DECRYPT).setBlockModes(android.security.keystore.KeyProperties.BLOCK_MODE_GCM).setEncryptionPaddings(android.security.keystore.KeyProperties.ENCRYPTION_PADDING_NONE).setKeySize(256).build());
  return gen.generateKey();
 }
 public class Bridge {
  @JavascriptInterface public void saveStudioPng(String data){
   if(data==null||!data.startsWith("data:image/png;base64,")||data.length()>16000000)return;
   try{byte[] bytes=android.util.Base64.decode(data.substring(22),android.util.Base64.DEFAULT);runOnUiThread(()->{studioPng=bytes;android.content.Intent intent=new android.content.Intent(android.content.Intent.ACTION_CREATE_DOCUMENT);intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);intent.setType("image/png");intent.putExtra(android.content.Intent.EXTRA_TITLE,"Les-Astres-Eric.png");try{startActivityForResult(intent,741);}catch(Exception e){studioPng=null;android.widget.Toast.makeText(MainActivity.this,"Sélecteur de fichiers indisponible",android.widget.Toast.LENGTH_LONG).show();}});}catch(Exception e){}
  }

  @JavascriptInterface public boolean saveApiKey(String value) {
   if(value==null || value.trim().isEmpty() || value.length()>512)return false;
   try {
    javax.crypto.Cipher c=javax.crypto.Cipher.getInstance("AES/GCM/NoPadding"); c.init(javax.crypto.Cipher.ENCRYPT_MODE,storageKey(true));
    String iv=android.util.Base64.encodeToString(c.getIV(),android.util.Base64.NO_WRAP);
    String data=android.util.Base64.encodeToString(c.doFinal(value.trim().getBytes(java.nio.charset.StandardCharsets.UTF_8)),android.util.Base64.NO_WRAP);
    return getSharedPreferences("gemini_private",MODE_PRIVATE).edit().putString("encrypted",iv+":"+data).commit();
   }catch(Exception e){return false;}
  }
  @JavascriptInterface public String loadApiKey() {
   String value=getSharedPreferences("gemini_private",MODE_PRIVATE).getString("encrypted",null);
   if(value==null)return "";
   try {
    String[] parts=value.split(":",2);
    javax.crypto.Cipher c=javax.crypto.Cipher.getInstance("AES/GCM/NoPadding");
    c.init(javax.crypto.Cipher.DECRYPT_MODE,storageKey(false),new javax.crypto.spec.GCMParameterSpec(128,android.util.Base64.decode(parts[0],android.util.Base64.NO_WRAP)));
    return new String(c.doFinal(android.util.Base64.decode(parts[1],android.util.Base64.NO_WRAP)),java.nio.charset.StandardCharsets.UTF_8);
   }catch(Exception e){return null;}
  }
  @JavascriptInterface public boolean clearApiKey() {
   return getSharedPreferences("gemini_private",MODE_PRIVATE).edit().remove("encrypted").commit();
  }

  @JavascriptInterface public String loadProfiles() {
   return getSharedPreferences("birth_profiles", Context.MODE_PRIVATE).getString("profiles", "[]");
  }
  @JavascriptInterface public boolean saveProfiles(String value) {
   if(value == null || value.length()>500000) return false;
   try { org.json.JSONArray a=new org.json.JSONArray(value); if(a.length()>200)return false;
    return getSharedPreferences("birth_profiles", Context.MODE_PRIVATE).edit().putString("profiles",a.toString()).commit();
   } catch(Exception e){return false;}
  }

  private String requestGemini(String key, String model, String prompt) {
   boolean listing = model.equals("LIST");
   javax.net.ssl.HttpsURLConnection conn = null;
   try {
    if ((!listing && !model.matches("gemini-[a-zA-Z0-9.\\-]+")) || key.length()>512 || prompt.length()>60000) throw new Exception("Paramètres invalides");
    conn = (javax.net.ssl.HttpsURLConnection)new java.net.URL("https://generativelanguage.googleapis.com/v1beta/models"+(listing?"?pageSize=100":"/"+model+":generateContent")).openConnection();
    conn.setInstanceFollowRedirects(false); conn.setConnectTimeout(15000); conn.setReadTimeout(120000);
    conn.setRequestMethod(listing?"GET":"POST"); conn.setDoOutput(!listing); conn.setRequestProperty("Content-Type","application/json"); conn.setRequestProperty("x-goog-api-key",key);
    org.json.JSONObject body = new org.json.JSONObject().put("contents",new org.json.JSONArray().put(new org.json.JSONObject().put("parts",new org.json.JSONArray().put(new org.json.JSONObject().put("text",prompt)))));
    if(!listing) try(java.io.OutputStream out=conn.getOutputStream()){out.write(body.toString().getBytes(java.nio.charset.StandardCharsets.UTF_8));}
    int status=conn.getResponseCode();
    if(status!=200){
     String detail="";
     try(java.io.InputStream in=conn.getErrorStream(); java.io.ByteArrayOutputStream out=new java.io.ByteArrayOutputStream()){
      if(in!=null){byte[] buf=new byte[2048];int n;while((n=in.read(buf))!=-1 && out.size()<65536)out.write(buf,0,n);
       org.json.JSONObject err=new org.json.JSONObject(out.toString("UTF-8")).optJSONObject("error");
       if(err!=null)detail=err.optString("status")+" : "+err.optString("message");}
     }catch(Exception ignored){}
     return new org.json.JSONObject().put("status",status).put("error","Gemini HTTP "+status+" — "+detail.replace(key,"[clé masquée]")).toString();
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
