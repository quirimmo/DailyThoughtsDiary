import { connect } from 'react-redux';
import { addItemThunk } from '../actions/items.action';
import AddItemScreen from '../screens/AddItem.screen';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItemThunk(item))
});

const AddItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddItemScreen);

export default AddItemContainer;
