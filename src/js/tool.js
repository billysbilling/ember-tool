var i18nContext = require('i18n-context');

module.exports = Em.Component.extend(require('ember-tooltip').Tooltipable, {
    template: require('../templates/tool'),
    
    classNames: ['tool'],
    classNameBindings: ['action:has-action', 'iconClassName', 'large'],

    tip: i18nContext.tProperty('tip'),
    text: i18nContext.tProperty('text'),
    tipPosition: 'top',

    icon: null,
    iconClassName: function() {
        return 'tool-'+this.get('icon').replace('/', '-');
    }.property('icon'),
    
    action: null,
    target: null,
    
    click: function(e) {
        var target = this.get('target'),
            action = this.get('action'),
            actionContext = this.get('actionContext');
        if (_.isString(target)) {
            target = Ember.Handlebars.get(this, target);
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