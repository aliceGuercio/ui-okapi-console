import React, { Component, PropTypes } from 'react';
import { connect } from 'stripes-connect';
import TenantForm from './TenantForm';

class TenantAdd extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static manifest = { 'tenants': { type: 'okapi',
                                   path: '_/proxy/tenants',
                                   fetch: false
                                 }
                    };

  create(data) {
    this.props.mutator['tenants'].POST(data).then(() =>
      this.context.router.transitionTo('/okapi-console/tenants')
      );
  }

  cancel(data) {
    this.context.router.transitionTo('/okapi-console/tenants');
  }

  render() {
    return (
        <TenantForm onSubmit={this.create.bind(this)} 
                    cancelForm={this.cancel.bind(this)} 
                    submitLabel='Add' />
    );
  }
}

export default connect(TenantAdd, 'okapi-console');
