import React, {Component} from 'react';
import '../scss/components.scss';

class SummaryRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="summary-row">
                <div className="summary-row-title">
                    <p><b>{this.props.summary.title}</b></p>
                </div>
                <div className="summary-row-content">
                    <div className="column">
                        <div className="text-color-status-green summary-text">{this.props.summary.passed}</div>
                        <div className="text-color-gery">Passed</div>
                    </div>
                    <div className="column">
                        <div className="text-color-status-red summary-text">{this.props.summary.failed}</div>
                        <div className="text-color-gery">Failed</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SummaryRow;
