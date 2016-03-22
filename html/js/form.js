var $id = function(id) { return document.getElementById(id); };
AWS.config.region = "ap-northeast-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: "ap-northeast-1:ae67d660-90d8-4f96-93e0-1f480faf5973"}); ##ここに控えておいたPoolIdを記載
AWS.config.credentials.get(function(err) {
    if (!err) {
        console.log("Cognito Identify Id: " + AWS.config.credentials.identityId);
    }
});

function uploadFile() {
    AWS.config.region = 'ap-northeast-1';
    var url = location.href;

    var s3BucketName = "REPLACE-DATA-BACKET";

    var now = new Date();
    var obj = {"name":$id("name").value, "mail":$id("mail").value ,"contents":$id("contents").value, "date": now.toLocaleString(), "url": url };
    var s3 = new AWS.S3({params: {Bucket: s3BucketName}});
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type:'text/plain'});
    s3.putObject({Key: "uploads/" +now.getTime()+".txt", ContentType: "text/plain", Body: blob, ACL: "public-read"},
    function(err, data){
    if(data !== null){
    alert("お問い合わせ完了致しました");
        console.log('data:' + data);
    }
    else{
        alert("Upload Failed" + err.message);
    }
    });
}
