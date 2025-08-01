import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../../hooks/useTheme';
import { Input } from './Input';
import { formatDateToMMDDYYYY } from '../../utils/formatters';

interface DateInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder = 'MM/DD/YYYY',
  minimumDate,
  maximumDate,
}) => {
  const theme = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    
    if (date) {
      setSelectedDate(date);
      const formattedDate = formatDateToMMDDYYYY(date);
      onChangeText?.(formattedDate);
    }
  };

  const handleInputPress = () => {
    setShowPicker(true);
  };

  const handleConfirm = () => {
    setShowPicker(false);
    if (selectedDate) {
      const formattedDate = formatDateToMMDDYYYY(selectedDate);
      onChangeText?.(formattedDate);
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
  };

  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
              <View style={[styles.pickerHeader, { borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={[
                    styles.pickerButton, 
                    { 
                      color: theme.colors.primary,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.medium,
                    }
                  ]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text style={[
                  styles.pickerTitle, 
                  { 
                    color: theme.colors.text,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }
                ]}>
                  Select Date
                </Text>
                <TouchableOpacity onPress={handleConfirm}>
                  <Text style={[
                    styles.pickerButton, 
                    { 
                      color: theme.colors.primary,
                      fontSize: theme.typography.fontSize.base,
                      fontWeight: theme.typography.fontWeight.medium,
                    }
                  ]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                style={styles.picker}
                textColor={theme.colors.text}
                accentColor={theme.colors.primary}
              />
            </View>
          </View>
        </Modal>
      );
    }

    return showPicker ? (
      <DateTimePicker
        value={selectedDate || new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    ) : null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleInputPress} activeOpacity={0.7}>
        <Input
          label={label}
          value={value}
          placeholder={placeholder}
          error={error}
          onBlur={onBlur}
          editable={false}
          pointerEvents="none"
          rightIcon="event"
        />
      </TouchableOpacity>
      {renderDatePicker()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  pickerTitle: {
    fontWeight: '600',
  },
  pickerButton: {
    fontWeight: '500',
  },
  picker: {
    height: 200,
  },
}); 