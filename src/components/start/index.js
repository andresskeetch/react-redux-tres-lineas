import React,  { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Start extends Component {
    render () {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={1} direction="column" alignItems="center">
                        <Grid item>
                            <Button variant="contained" color="primary"
                                onClick={() => this.props.history.push('/playing')}
                            >
                                INICIAR JUEGO
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Start);