import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 30,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: 'red',
    margin: 2,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 100,
    width: Dimensions.get('screen').width - 40,
    marginHorizontal: 20,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomContainer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 20,
  },
  newCourseContainer: {
    top: 20,
    padding: 15,
    width: '100%',
  },
  codeInput: {
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
  },
  nameInput: {
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
  },
  semesterInput: {
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
  },
  creditsInput: {
    fontSize: 18,
    borderBottomWidth: 1.0,
    borderColor: 'lightgrey',
    marginBottom: 20,
  },
  dropDownButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 1.0,
  },
  dropDownButtonText: {
    textAlign: 'left',
    fontSize: 18,
  },
  dropDownStyle: {
  },
  dropDownRowStyle: {
    borderBottomColor: '#C5C5C5',
  },
  dropDownRowTextStyle: {
    textAlign: 'left',
    fontSize: 18,
  },
});

export default styles;
