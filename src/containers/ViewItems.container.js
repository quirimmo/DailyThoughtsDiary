import moment from 'moment';
import { connect } from 'react-redux';
import ViewItemsScreen from '../screens/ViewItems.screen';
import { deleteItemThunk } from '../actions/items.action';

const mapStateToProps = (state, ownProps) => {
	const passedDate = ownProps.navigation.getParam('date');
	return {
		items: state.items.filter(item =>
			moment(item.date).isSame(passedDate, 'day')
		)
	};
};

const mapDispatchToProps = dispatch => ({
	deleteItem: item => dispatch(deleteItemThunk(item))
});

const ViewItemsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewItemsScreen);

export default ViewItemsContainer;
