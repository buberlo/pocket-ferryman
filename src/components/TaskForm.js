import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTasks } from '../hooks/useTasks';

const MAX_LENGTH = 80;

export default function TaskForm({ onAdd, placeholder = 'What haunts you?' }) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = title.trim();

    if (!trimmed) {
      setError('Name the ghost first.');
      return;
    }

    if (trimmed.length > MAX_LENGTH) {
      setError(`Keep it under ${MAX_LENGTH} characters.`);
      return;
    }

    setError('');
    (onAdd || addTask)(trimmed);
    setTitle('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.label}>New ghost task</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError('');
            }}
            placeholder={placeholder}
            placeholderTextColor="#8f8aa5"
            maxLength={MAX_LENGTH}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
            blurOnSubmit
          />
          <Pressable
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
            onPress={handleSubmit}
          >
            <Text style={styles.addButtonText}>Summon</Text>
          </Pressable>
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  label: {
    color: '#dcd7e8',
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(20, 18, 32, 0.85)',
    borderColor: 'rgba(122, 108, 160, 0.35)',
    borderRadius: 12,
    borderWidth: 1,
    color: '#f3f0ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#6d5bd0',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginStart: 8,
  },
  addButtonPressed: {
    backgroundColor: '#5a49b8',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  error: {
    color: '#ff9e9e',
    marginTop: 6,
    fontSize: 12,
  },
});