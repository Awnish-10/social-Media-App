import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  errorMessage: string;
  onHide: () => void;
}

const ErrorPopup: React.FC<ErrorMessageProps> = ({ errorMessage, onHide }) => {

    useEffect(()=>{
        setTimeout(()=>{onHide()},2000)
    },[])
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#E15252',
    backgroundColor: '#FEE2E2',
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    color: '#E15252',
  },
});

export default ErrorPopup;
