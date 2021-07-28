module.exports = async function (context, req) {

    const SMS = require('smsalert');

    const username = 'SMS_ALERT_USERNAME';//SMS Alert account username.
    const password = 'SMS_ALERT_PASSWORD';//SMS Alert account password.

    const sms = new SMS(username, password);//Create SMS Alert authenticated instance.

    const params = Object.assign(req.query, req.body);

    if (params.mobileno != null && params.message != null && params.sender != null) {
        var responseMessage = await sms.send(params.mobileno, params.message, params.sender).then((value) => {
            console.log(value);
            return value;
        });
        context.res = {
            body: responseMessage.description.desc
        };
    }
    else {
        context.res = {
            body: 'Pass the mobileno, message and sender in the query string to send the SMS.'
        };
    }

}