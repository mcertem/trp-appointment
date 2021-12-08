const notifier = require('node-notifier');
const { isDesktopNotificationsActive } = require('../util/preferences');

const templateMessage = {
    title: 'My notification',
    message: 'Hello, there!',
    sound: true
}

exports.showSimpleMessage = (title, message) => {
    if (!isDesktopNotificationsActive) {
        return;
    }

    notifier.notify({
        title,
        message
    });
}

exports.showMessage = () => {
    if (!isDesktopNotificationsActive) {
        return;
    }
    
    notifier.notify(templateMessage);
}