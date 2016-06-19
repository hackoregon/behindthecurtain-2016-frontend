import React, { Component, PropTypes } from 'react';
import { Grid } from 'react-flexbox-grid';
import DonorPage from '../containers/Donor/DonorPage';
import BTCNav from '../components/Navigation/BTCNav';

class DonorsPage extends Component {

    render() {
        return (
            <div>
                <BTCNav />
                  <Grid  style= {{paddingTop:'100px',fontWeight: '200px'}} fluid={ true }>
                  <DonorPage
                    params={this.props.params} donor_name={this.props.params.donor_name} />
                  </Grid>
            </div>
            );
    }
}

export default DonorsPage;
