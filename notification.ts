import { AppState, PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';

const _handleAppStateChange = (nextAppState: any) => {

    _registerLocalNotification();
};

const _registerLocalNotification = () => {
  PushNotification.setApplicationIconBadgeNumber(0);
  PushNotification.cancelAllLocalNotifications();

  let nextHour = new Date();
  nextHour.setDate(nextHour.getDate() + 1);
  nextHour.setHours(nextHour.getHours() - 1);


  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    vibrate: true,
    vibration: 300,
    priority: 'high',
    visibility: 'public',
    importance: 'high',

    /* iOS and Android properties */
    message: 'Keep doing well !! Stay strong !! ', // (required)
    playSound: false,
    number: '1',
    actions: '["OK"]',

    // for production
    repeatType: 'hour', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    date: new Date(Date.now()),

    // test to trigger each miniute
    // repeatType: 'minute',
    // date: new Date(Date.now()),

    // test to trigger one time
    // date: new Date(Date.now() + 20 * 1000),
  });
};
export default {
  register: async () => {
    PushNotification.configure({
      onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
    });

    _registerLocalNotification();

    AppState.addEventListener('change', _handleAppStateChange);
  },
  unregister: () => {
    AppState.removeEventListener('change', _handleAppStateChange);
  },
};