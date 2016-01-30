import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';


export default function connectComponent({ mapStateToProps, mapDispatchToProps, LayoutComponent }) {
	return connect(
		mapStateToProps || function (state) {
			return state;
		},
		mapDispatchToProps || function (dispatch) {
			return {
				actions: bindActionCreators(actions, dispatch)
			}
		}
	)(LayoutComponent);
}
