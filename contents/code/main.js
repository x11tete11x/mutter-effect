/*global effect, effects, animate, animationTime, Effect, QEasingCurve*/
var MutterEffect = {
  duration: animationTime(150),
  isfadeWindow: function(window) {
    if (window.deleted && effect.isGrabbed(window, Effect.WindowClosedGrabRole))
    {
      return false;
    } else if (!window.deleted && effect.isGrabbed(window, Effect.WindowAddedGrabRole))
    {
      return false;
    } else if (window.windowClass.match("plasma|Plasma"))
    {
      return false;
    }
    return window.visible && window.onCurrentDesktop && !MutterEffect.isLoginWindow(window) && ! window.desktopWindow &&
    !window.utility && !window.minimized;
  },
  isLoginWindow: function(window) {
    return window.windowClass == "ksplashx ksplashx" ||
	   window.windowClass == "ksplashsimple ksplashsimple" ||
	   window.windowClass == "qt-subapplication ksplashqml";
  },
  fadeWindow: function (window, direction) {
        animate({
            window: window,
            duration: MutterEffect.duration,
            animations: [{
                type: Effect.Opacity,
                curve: QEasingCurve.InOutQuad,
                from: direction === 'in' ? 0.0 : 1.0,
                to: direction === 'in' ? 1.0 : 0.0
            }, {
                type: Effect.Scale,
                curve: QEasingCurve.InOutQuad,
                from: direction === 'in' ? 0.75 : 1.0,
                to: direction === 'in' ? 1.0 : 0.75
            }]
        });
    },
  shown: function(window) {
    if (MutterEffect.isfadeWindow(window))
    MutterEffect.fadeWindow(window, 'in');
  },
  closed: function (window) {
    if (MutterEffect.isfadeWindow(window))
    MutterEffect.fadeWindow(window, 'out');
  },
  init: function () {
        effects.windowAdded.connect(MutterEffect.shown);
	effects.windowClosed.connect(MutterEffect.closed);
  }
};

MutterEffect.init();
