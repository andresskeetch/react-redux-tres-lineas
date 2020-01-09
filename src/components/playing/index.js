import React,  { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '@material-ui/core';
import getData from '../../redux/actions/getData';
import selectOption from '../../redux/actions/selectOption';
import getWinOptions from '../../redux/actions/getWinOptions';
import restartGame from '../../redux/actions/restartGame';
import setGameWon from '../../redux/actions/gameWon';
import './style.css';
import xImage from '../../assetts/img/x.png';
import circleImage from '../../assetts/img/circle.png';


class Playing extends Component {
    componentDidMount() {
        this.props.getData();
        this.props.getWinOptions();
    }

    itemSelected(indexRow, indexColumn, column, playerActive) {
        const { gameWon } = this.props;
        if (column.value || gameWon)
            return;
        
        this.props.selectOption(indexRow, indexColumn, playerActive)
        this.validatePlayerWin(indexRow, indexColumn, playerActive);
        this.validateAllPicks();
    }
    restartGame() {
        this.props.restartGame();
    }
    validatePlayerWin(indexRow, indexColumn, playerActive) {
        const { data } = this.props;
        const optionsAvalible = []
        this.props.winOptions.forEach(item => {
            item.values.forEach(value => {
                if (((value.indexRow === indexRow) && (value.indexColumn === indexColumn))) {
                    optionsAvalible.push(item)
                }
            })
        })
        optionsAvalible.forEach(winOption => {
            let countAccert = 0;
            winOption.values.forEach(option => {
                if (data[option.indexRow].columns[option.indexColumn].value === playerActive) {
                    countAccert++;
                }
            });
            if (countAccert === 3) {
                //player win
                alert('Jugador ' + playerActive + ' gana.');
                this.props.setGameWon();
            }
        });
    }
    validateAllPicks() {
        const { data } = this.props;
        let countNoSelected = 0;
        data.forEach((row) => {
            row.columns.forEach((column) => {
                if (column.value === '') {
                    countNoSelected++;
                }
            })
        })
        if (countNoSelected === 0) {
            alert('Ningun jugador Gana');
            this.props.setGameWon();
        }
    }
    render () {
        const { data, playerActive, newGame, gameWon } = this.props;
        return (
            <div className="page">
                <div className="page__header">
                    <Typography className="page-message" variant="h1" component="h1" >
                            Tres en Linea
                    </Typography>
                </div>
                <div className="page__container">
                    <Typography className="page-message-gamer" component="h3" >
                        {newGame && <span>Seleccionar para empezar..</span>} Jugador ({playerActive})
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row" justify="center">
                                <Grid item  md={4} xs={4}>
                                {data && data.map((row, indexRow) => 
                                    <Grid container direction="row" key={indexRow}>
                                        {row.columns.map((column, indexColumn) => 
                                            <Grid key={indexColumn} padding={1} item md={4} xs={4} >
                                                <Paper 
                                                    className="items" 
                                                    onClick={() => this.itemSelected(indexRow, indexColumn, column, playerActive)}>
                                                    {column.value ? (column.value === 'X' ? <img src={xImage} alt="X" /> : <img src={circleImage} alt="O" />) : null}
                                                </Paper>
                                            </Grid>
                                        )} 
                                    </Grid>
                                )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <div className="page__footer">
                    { !gameWon &&
                        <div className="restart">
                            <Button variant="contained" color="primary" onClick={() => this.restartGame()}>
                                Reniciar Juego
                            </Button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.playing.data,
        playerActive: state.playing.playerActive,
        newGame: state.playing.isNew,
        winOptions: state.playing.winOptions,
        gameWon: state.playing.gameWon,
    }
}

const mapDispatchToProps = {
    getData,
    selectOption,
    getWinOptions,
    restartGame,
    setGameWon
}

export default  connect(mapStateToProps, mapDispatchToProps)(Playing);