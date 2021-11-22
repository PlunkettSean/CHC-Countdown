import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown/src/SelectDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
const database = require('../../components/Handlers/database.js');

const NewCourseScreen = props => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [credits, setCredits] = useState('');
  const [status, setStatus] = useState('');
  const [designator, setDesignator] = useState('');

  const statuses = ['Complete', 'In Progress', 'Not Complete'];
  const designators = ['1st Major', '2nd Major', '1st Minor', '2nd Minor', 'Core', 'Elective']
  const navigation = useNavigation();

  const onCourseAdd = () => {
    if (!code) {
      alert('Please fill in code');
      return;
    }
    if (!name) {
      alert('Please fill in Course Name');
      return;
    }
    if (!credits) {
      alert('Please fill in Credits');
      return;
    }
    if (!semester) {
      alert('Please fill in Semester');
      return;
    }
    if (!status) {
      alert('Please select a Status');
      return;
    }
    if (!designator) {
      alert('Please select a Designator');
      return;
    }

    const course = {
      code,
      name,
      credits,
      semester,
      status,
      designator
    }

    database.addCourse(code,
      name, credits, semester, status, designator).catch(e => {
        console.log(e);
      });
    /*
    console.warn(
      code,
      name,
      semester,
      credits,
      status,
      designator
    );
    */
    alert('Course Created!');
    navigation.navigate('Get started!')
  };

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          autoCapitalize={"characters"}
          value={code}
          onChangeText={value => setCode(value)}
          style={styles.codeInput}
          placeholder={'Code'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          maxLength={8}
        />
        <TextInput
          value={name}
          onChangeText={value => setName(value)}
          style={styles.nameInput}
          placeholder={'Name'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
        />
        <TextInput
          value={credits}
          onChangeText={value => setCredits(value)}
          style={styles.creditsInput}
          placeholder={'Credits'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          keyboardType={'numeric'}
          maxLength={1}
        />
        <TextInput
          value={semester}
          onChangeText={value => setSemester(value)}
          style={styles.semesterInput}
          placeholder={'Semester'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          maxLength={11}
        />
        <SelectDropdown
          data={statuses}
          value={status}
          onSelect={(selectedItem, index) => setStatus(selectedItem)}
          defaultButtonText={'Status ...'}
          buttonStyle={styles.dropDownButton}
          buttonTextStyle={styles.dropDownButtonText}
          renderDropdownIcon={() => {
            return (
              <FontAwesome name={'chevron-down'} color={'lightgrey'} size={18} />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropDownStyle}
          rowStyle={styles.dropDownRowStyle}
          rowTextStyle={styles.dropDownRowTextStyle}
        />
        <SelectDropdown
          data={designators}
          value={designator}
          onSelect={(selectedItem, index) => setDesignator(selectedItem)}
          defaultButtonText={'Designator ...'}
          buttonStyle={styles.dropDownButton}
          buttonTextStyle={styles.dropDownButtonText}
          renderDropdownIcon={() => {
            return (
              <FontAwesome name={'chevron-down'} color={'lightgrey'} size={18} />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropDownStyle}
          rowStyle={styles.dropDownRowStyle}
          rowTextStyle={styles.dropDownRowTextStyle}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.searchButton} onPress={onCourseAdd}>
          <Text style={styles.searchButtonText}>Add Course</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewCourseScreen;
