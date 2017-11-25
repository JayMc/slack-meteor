import React, { PureComponent } from 'react';

export default class ReadReceipt extends PureComponent {

	render () {
		const { readReceipt, readReceiptMessage, memberCount } = this.props

		return (
			<div>
				{/* Show read receipt for last comment*/}
				{readReceiptMessage && readReceipt.length < memberCount - 1 && readReceipt.length === 1 &&
					<div
						className="comment-receipt-delivery"
						>
							✔
					</div>
				}
				{/* 2 ticks if more than 1 member has viewed it */}
				{readReceiptMessage && readReceipt.length === memberCount - 1 &&
					<div
						className="comment-receipt-delivery"
						>
							✔✔
					</div>
				}
			</div>
		)
	}
}
