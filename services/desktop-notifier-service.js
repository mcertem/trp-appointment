const notifier = require('node-notifier');

const templateMessage = {
    title: 'My notification',
    message: 'Hello, there!',
    sound: true
}

exports.showSimpleMessage = (title, message) => {
    notifier.notify({
        title,
        message
    });
}

exports.showMessage = () => {
    notifier.notify(templateMessage);
}