var i18nContext = require('i18n-context');

module.exports = Em.Component.extend(require('ember-tooltip').Tooltipable, {
    layout: require('../templates/tool'),

    classNames: ['tool'],
    classNameBindings: ['hasAction', 'iconClassName', 'large'],

    tip: i18nContext.tProperty('tip'),
    text: i18nContext.tProperty('text'),
    tipPosition: 'top',

    icon: null,
    iconSide: 'left',
    iconClassName: function() {
        //No icon
        if (!this.get('icon')) {
            return null;
        }

        //Remove ember-svg css class (.xxxx) and title (@xxxx)
        var icon = this.get('icon')
            .replace('/', '-')
            .replace(/\..+?$/, '')
            .replace(/@.+?$/, '');
        return 'tool-'+icon + ' icon-side-' + this.get('iconSide');
    }.property('icon', 'iconSide'),

    hasAction: function() {
        return !!this.get('action');
    }.property('action'),

    action: null,
    target: null,

    click: function(e) {
        var target = this.get('target'),
            action = this.get('action'),
            actionContext = this.get('actionContext');
        if (_.isString(target)) {
            target = Ember.get(this, target);
        }
        if (!target) {
            return;
        }
        e.stopPropagation();
        if (typeof action === 'function') {
            return action.call(target, actionContext);
        } else if (typeof target.send === 'function') {
            return target.send(action, actionContext);
        } else {
            Ember.assert("The action '" + action + "' did not exist on " + target, typeof target[action] === 'function');
            return target[action](actionContext);
        }
    }
});
