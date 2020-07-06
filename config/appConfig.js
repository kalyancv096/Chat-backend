let appConfig={};
appConfig.PORT=3001;
appConfig.environment="dev";
appConfig.apiVersion="/api/v1";
appConfig.allowedCorsOrigin="*";
appConfig.db={
    url:'mongodb://localhost:27017/chatapp'
}
module.exports=appConfig;

