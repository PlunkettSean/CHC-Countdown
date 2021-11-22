import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Pressable } from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown/src/SelectDropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const tableName = 'courses';

const courseDB = openDatabase({ name: 'CourseList.db' });


const ExistingCourseScreen = props => {

  const navigation = useNavigation();

  const post = props.route.params.post;

  const statuses = ['Complete', 'In Progress', 'Not Complete'];
  const designators = ['1st Major', '2nd Major', '1st Minor', '2nd Minor', 'Core', 'Elective']

  const [code, setCode] = useState(post.code);
  const [name, setName] = useState(post.name);
  const [semester, setSemester] = useState(post.semester);
  const [credits, setCredits] = useState(post.credits);
  const [status, setStatus] = useState(post.status);
  const [designator, setDesignator] = useState(post.designator);

  const onCourseUpdate = () => {
    // console.warn(designator);

    const updateCourse = () => {
      console.log('[DATA]', 'updateCourse: ' + code + name);
      courseDB.transaction(txn => {
        txn.executeSql(
          `UPDATE ${tableName} SET code = '${code}', name = '${name}', credits = '${credits}', semester = '${semester}', status = '${status}', designator = '${designator}' WHERE id = ${post.id}`, [],
          (sqlTxn, res) => {
            console.log(`${category} category updated successfully`);
          },
          error => {
            console.log("error on updateing course " + error.message);
          },
        );
      });
    }

    updateCourse();
    alert('Course Updated!');
    navigation.navigate('All')
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this course?",
      [
        {
          text: "Yes",
          onPress: () => {
            onCourseDelete();
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const onCourseDelete = () => {
    const deleteCourse = () => {
      console.log('[DATA]', 'Delete: ' + code + name);
      courseDB.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${tableName} WHERE id = ${post.id}`, [],
          (sqlTxn, res) => {
            console.log(`${category} category deleted successfully`);
          },
          error => {
            console.log("error on deleteing course " + error.message);
          },
        );
      });
    }

    deleteCourse();

    const getStatusCourses = () => {
      courseDB.transaction(txn => {
        txn.executeSql(
          `SELECT * FROM ${tableName}`,
          [],
          (sqlTxn, res) => {
            console.log("Courses retrieved successfully");
            let len = res.rows.length;
            if (len < 1) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
              alert('Course Deleted!');
              navigation.navigate('Home')
            }
            else {
              alert('Course Deleted!');
              navigation.navigate('Get started!')
            }
          },
          error => {
            console.log("error on getting courses " + error.message);
          },
        );
      });
    }

    getStatusCourses();


  };




  // console.warn("[DBUG]", credits);

  console.log('DGUB')

  return (
    <View style={styles.container}>
      <View style={styles.newCourseContainer}>
        <TextInput
          value={code}
          onChangeText={value => setCode(value)}
          style={styles.codeInput}
          placeholder={'Code'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          maxLength={10}
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
          value={"" + credits}
          onChangeText={value => setCredits(value)}
          style={styles.creditsInput}
          placeholder={'Credits'}
          placeholderTextColor={'grey'}
          clearButtonMode={'while-editing'}
          keyboardType={'numeric'}
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
          onSelect={(selectedItem) => setStatus(selectedItem)}
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
          defaultValue={post.status}
        />
        <SelectDropdown
          data={designators}
          value={designator}
          onSelect={(selectedItem) => setDesignator(selectedItem)}
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
          defaultValue={post.designator}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.searchButton} onPress={onCourseUpdate}>
          <Text style={styles.searchButtonText}>Update Course</Text>
        </Pressable>
        <Pressable style={styles.searchButton} onPress={showConfirmDialog}>
          <Text style={styles.searchButtonText}>Delete Course</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExistingCourseScreen;
