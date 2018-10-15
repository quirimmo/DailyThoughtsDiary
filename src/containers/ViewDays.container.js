import { connect } from 'react-redux';
import { fetchItemsThunk } from '../actions/items.action';
import ViewDaysScreen from '../screens/ViewDays.screen';

const mapStateToProps = state => ({
	items: state.items
});

const mapDispatchToProps = dispatch => ({
	fetchItems: () => dispatch(fetchItemsThunk())
});

const ViewDaysContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewDaysScreen);

export default ViewDaysContainer;
