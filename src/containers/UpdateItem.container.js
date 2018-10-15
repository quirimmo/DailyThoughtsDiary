import { connect } from 'react-redux';
import { updateItemThunk } from '../actions/items.action';
import UpdateItemScreen from '../screens/UpdateItem.screen';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	updateItem: item => dispatch(updateItemThunk(item))
});

const UpdateItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateItemScreen);

export default UpdateItemContainer;
