import isEqual from 'lodash/lang/isEqual';
import isFunction from 'lodash/lang/isFunction';
import React from 'react';
import shallowEqual from 'react/lib/shallowEqual';

import FamousNodeMixin from './FamousNodeMixin';
import FamousUtil from './FamousUtil';

export default {
  mixins: [FamousNodeMixin],

  propTypes: {
    _onReady: React.PropTypes.func
  },

  componentWillMount() {
    this.setFamousReady(false);
  },

  componentDidMount() {
    if (isFunction(this.famousCreate)) {
      let props = FamousUtil.sanitizeProps(this.props);
      let options = FamousUtil.parseOptions(props);
      let children = props.children;
      let states = this.states;
      this.setFamousOptions(options);
      this.famousCreate({children, options, props, states});
    }
    this.setFamousReady(true);
    this.forceUpdate(() => {
      if (this.props._onReady) {
        this.props._onReady();
      }
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !isEqual(this.props.options, nextProps.options);
  },

  componentWillUpdate(nextProps, nextState) {
    if (isFunction(this.famousUpdate)) {
      let props = FamousUtil.sanitizeProps(nextProps);
      let options = FamousUtil.parseOptions(props);
      let children = props.children;
      let states = nextState;
      this.setFamousOptions(options);
      this.famousUpdate({children, options, props, states});
    }
  },

  componentWillUnmount() {
    if (isFunction(this.famousDelete)) {
      this.famousDelete();
    }
    this.releaseFamous();
  }
};
