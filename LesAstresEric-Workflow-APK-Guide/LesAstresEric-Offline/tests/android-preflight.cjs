const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const manifest=read('app/src/main/AndroidManifest.xml');
const app=read('app/build.gradle');
const main=read('app/src/main/java/fr/lesastres/eric/MainActivity.java');
const checks=[
 ['Android application plugin',app.includes("com.android.application")],
 ['Android namespace',app.includes("fr.lesastres.eric")],
 ['SDK 35 configured',/compileSdk\s+35/.test(app)],
 ['Launcher exported',/android:exported="true"/.test(manifest)],
 ['Backup disabled',/android:allowBackup="false"/.test(manifest)],
 ['Cleartext traffic disabled',/android:usesCleartextTraffic="false"/.test(manifest)],
 ['MainActivity exists',main.includes('class MainActivity')],
 ['Offline engine asset',fs.existsSync(path.join(root,'app/src/main/assets/engine.js'))],
 ['Offline UI asset',fs.existsSync(path.join(root,'app/src/main/assets/index.html'))],
];
for(const [label,pass] of checks)console.log(`${pass?'PASS':'FAIL'} ${label}`);
assert.ok(checks.every(([,pass])=>pass),'Static Android preflight failed');
console.log('PASS Static preflight only; does not compile or install Android application.');
