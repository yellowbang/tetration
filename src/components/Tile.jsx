/* eslint-disable space-before-function-paren,no-trailing-spaces */
import React from 'react';
import PropTypes from 'prop-types';
import {ContextMenu, Item, ContextMenuProvider} from 'react-contexify';
import anyCircle from '../../src/assets/images/iconCircles/anyCircle.svg';
import bdCircle from '../../src/assets/images/iconCircles/bdCircle.svg';
import encapCircle from '../../src/assets/images/iconCircles/encapCircle.svg';
import epCircle from '../../src/assets/images/iconCircles/epCircle.svg';
import epgCircle from '../../src/assets/images/iconCircles/epgCircle.svg';
import instpCircle from '../../src/assets/images/iconCircles/instpCircle.svg';
import interfaceCircle from '../../src/assets/images/iconCircles/interfaceCircle.svg';
import inventoryCircle from '../../src/assets/images/iconCircles/inventoryCircle.svg';
import leafCircle from '../../src/assets/images/iconCircles/leafCircle.svg';
import queryCircle from '../../src/assets/images/iconCircles/queryCircle.svg';
import subnetCircle from '../../src/assets/images/iconCircles/subnetCircle.svg';
import vrfCircle from '../../src/assets/images/iconCircles/vrfCircle.svg';
import '../scss/components.scss';
import {Icon, IconButton} from 'cisco-ui-components';
import util from '../common/util';

class RightClickedElement extends React.Component {
    render() {
        let me = this;

        return (
            <div className={me.props.className} onClick={me.props.onClickFn}>
                <ContextMenuProvider id={me.props.id}>
                    {me.props.children}
                </ContextMenuProvider>
                <ContextMenu id={me.props.id}>
                    <Item onClick={function() {
                        me.props.onMoreSearch(me.props.type);
                    }}>Explore</Item>
                </ContextMenu>
            </div>
        );
    }
}

class Tile extends React.Component {
    constructor(...args) {
        super(...args);
        this.tileIsSelected = this.tileIsSelected.bind(this);
        this.onTileClicked = this.onTileClicked.bind(this);
        this.onClickCheckBox = this.onClickCheckBox.bind(this);
        this.onMoreSearch = this.onMoreSearch.bind(this);

        this.state = {
            isChecked: this.tileIsSelected(this.props)
        };
    }

    tileIsSelected(props) {
        return props.selectedTiles && props.selectedTiles.indexOf(props.data) !== -1;
    }

    onTileClicked() {
        if (this.props.onTileClicked) {
            this.props.onTileClicked(this.props.data);
        }
    }

    onClickCheckBox(proxy) {
        proxy.stopPropagation();
        this.setState({isChecked: !this.state.isChecked}, () => {
            if (this.props.onTileClicked instanceof Function) {
                this.props.onTileClicked(this.props.data);
            }
        });
    }

    onClickColumn(proxy, data) {
        proxy.stopPropagation();
        this.props.onTileNumberClicked(data);
    }

    onClickEndPoint(proxy, data) {
        proxy.stopPropagation();
        this.props.onShowEps(data, this.props.model);
    }

    onMoreSearch(type) {
        this.props.onMoreSearch(type, this.props.data.tileQueryUrl);
    }

    componentWillReceiveProps(nextProps) {
        let isChecked;

        if (nextProps.data !== this.props.data) {
            isChecked = false;
        }
        isChecked = this.tileIsSelected(nextProps);
        this.setState({
            isChecked
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data !== this.props.data ||
            nextState.isChecked !== this.state.isChecked;
    }

    render() {
        const me = this;
        let tileClass = 'tile-container';
        let tileContentClass = 'tile-content-container';
        if (this.state.isChecked) {
            tileClass = tileClass + ' blue-background';
            tileContentClass = tileContentClass + ' selected';
        }
        if (this.props.status === 'new') {
            tileContentClass = tileContentClass + ' status-green';
        } else if (this.props.status === 'removed') {
            tileContentClass = tileContentClass + ' status-red';
        } else if (this.props.status === 'modified') {
            tileContentClass = tileContentClass + ' status-yellow';
        }

        let name = this.props.data.name;

        let iconSrc = queryCircle;

        if (this.props.data && this.props.data.allData) {
            if (this.props.data.allData.tile_type === 'N_BD') {
                iconSrc = bdCircle;
            } else if (this.props.data.allData.tile_type === 'N_ENCAP') {
                iconSrc = encapCircle;
            } else if (this.props.data.allData.tile_type === 'N_EP') {
                iconSrc = epCircle;
            } else if (this.props.data.allData.tile_type === 'N_EPG') {
                iconSrc = epgCircle;
            } else if (this.props.data.allData.tile_type === 'N_INF') {
                iconSrc = interfaceCircle;
            } else if (this.props.data.allData.tile_type === 'N_INSTP') {
                iconSrc = instpCircle;
            } else if (this.props.data.allData.tile_type === 'N_INVENTORY') {
                if (name === 'any') {
                    iconSrc = anyCircle;
                } else {
                    iconSrc = inventoryCircle;
                }
            } else if (this.props.data.allData.tile_type === 'N_LEAF') {
                iconSrc = leafCircle;
            } else if (this.props.data.allData.tile_type === 'N_SUBNET') {
                iconSrc = subnetCircle;
            } else if (this.props.data.allData.tile_type === 'N_VRF') {
                iconSrc = vrfCircle;
            }
        }

        let icon = (
            <img className="tile-icon-image" src={iconSrc}/>
        );

        let columns = [];
        let keys = Object.keys(this.props.data.allData);
        keys.forEach(function(key) {
            if (key.indexOf('N_') === 0 && key !== 'N_EPG' && key !== 'N_INSTP' && key !== 'N_EP' && key !== 'N_INVENTORY' && key !== me.props.data.allData.tile_type) {
                let count = me.props.data.allData[key].count;
                let clickFn = util.emptyFn;
                let numberClassName = 'number';
                let id = key + Math.random();
                if (count) {
                    clickFn = (proxy) => {
                        me.onClickColumn(proxy, me.props.data.allData[key].data);
                    };
                    numberClassName = numberClassName + ' cursor-pointer';
                }
                let label;
                switch (key) {
                    case 'N_BD':
                        label = 'BDs';
                        break;
                    case 'N_ENCAP':
                        label = 'Encaps';
                        break;
                    case 'N_EP':
                        label = 'Endpoints';
                        break;
                    case 'N_INF':
                        label = 'Infs';
                        break;
                    case 'N_LEAF':
                        label = 'Leaves';
                        break;
                    case 'N_VRF':
                        label = 'VRFs';
                        break;
                    default:
                        label = key.split('N_')[1];
                        break;
                }
                columns.push(
                    <div key={key} className="tile-info-column-container">
                        <RightClickedElement
                            className={numberClassName}
                            onClickFn={clickFn}
                            id={id}
                            onMoreSearch={me.onMoreSearch}
                            type={key}>
                            {me.props.data.allData[key].count}
                        </RightClickedElement>
                        <div className="tile-label">{label}</div>
                    </div>
                );
            }
        });

        let id = 'N_EP' + Math.random();
        columns.push(
            <div key={'N_EP'} className="tile-info-column-container">
                <RightClickedElement
                    className={'cursor-pointer number'}
                    onClickFn={(proxy) => me.onClickEndPoint(proxy, [me.props.data.tileQueryUrl])}
                    id={id}
                    onMoreSearch={me.onMoreSearch}
                    type={'N_EP'}>
                    {me.props.data.allData.N_EP.count}
                </RightClickedElement>
                <div className="tile-label">Endpoints</div>
            </div>
        );

        let epgId = 'epg' + Math.random();
        return (
            <div className={tileClass}>
                <div className={tileContentClass} onClick={me.onTileClicked}>
                    <div className="tile-image-container flex-half">
                        {icon}
                    </div>
                    <div className="tile-info-column-container">
                        <div className="text-one-row">{name}</div>
                    </div>
                    {columns}
                    <div className="tile-info-column-container">
                        <RightClickedElement
                            className={'tile-end-point-number cursor-pointer'}
                            onClickFn={(proxy) => me.onClickColumn(proxy, me.props.data.allData.N_EPG.data)}
                            id={epgId}
                            onMoreSearch={me.onMoreSearch}
                            type={'N_EPG'}>
                            {this.props.data.allData.N_EPG.count}
                        </RightClickedElement>
                        <div className="tile-end-points-text text-color-gery ">{'EPGs'}</div>
                    </div>
                    {
                        this.props.disableSelection ?
                            null
                            :
                            <div className="tile-info-column-container flex-half cursor-pointer" onClick={this.onClickCheckBox}>
                                <div className="tile-toggle-icon-container">
                                    {this.state.isChecked ?
                                        <Icon type={Icon.TYPE.CHECK}/>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

Tile.propTypes = {
    model: PropTypes.string,
    disableSelection: PropTypes.bool,
    isChecked: PropTypes.bool,
    data: PropTypes.object,
    status: PropTypes.string,
    selectedTiles: PropTypes.array,
    onTileNumberClicked: PropTypes.func,
    onShowEps: PropTypes.func,
    onMoreSearch: PropTypes.func,
    onTileClicked: PropTypes.func
};

Tile.defaultProps = {
    isChecked: false,
    selectedTiles: [],
    data: {}
};

export default Tile;
