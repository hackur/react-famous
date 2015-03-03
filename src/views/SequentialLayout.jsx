import RenderNode from 'famous/core/RenderNode';
import SequentialLayout from 'famous/views/SequentialLayout';
import toPlainObject from 'lodash/lang/toPlainObject';
import React from 'react';
import cloneWithProps from 'react/lib/cloneWithProps';

import FamousMixin from '../lib/FamousMixin';
import FamousUtil from '../lib/FamousUtil';

export default React.createClass({
  mixins: [FamousMixin],

  propTypes: {
    direction: React.PropTypes.number,
    itemSpacing: React.PropTypes.number
  },

  renderFamous() {
    return (
      <div data-famous="SequentialLayout">
        {this.props.children.map((child, key) => cloneWithProps(child, {key}))}
      </div>
    );
  },

  updateFamous(props) {
    let sequentialLayout = this.getFamous();
    let options = FamousUtil.parseOptions(props);
    let optionsChanged = this.setFamousOptions(options);
    let render = true;

    if (!sequentialLayout) {
      sequentialLayout = new SequentialLayout(options);
      this.setFamous(sequentialLayout);
      this.setFamousNode(FamousUtil.getFamousParentNode(this).add(sequentialLayout));

      let sequence = props.children.map(() => new RenderNode());
      sequentialLayout.sequenceFrom(sequence);
      this.setFamousKeyedNodes(toPlainObject(sequence));
    } else if (optionsChanged) {
      surface.setOptions(options);
    }

    if (render) {
      this.forceUpdate();
    }
  }
});
