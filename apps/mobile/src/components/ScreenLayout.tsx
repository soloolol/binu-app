import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, StyleSheet} from 'react-native';

type ScreenLayoutProps = {
  children: ReactNode;
  scrollable?: boolean;
  withPadding?: boolean;
  backgroundColor?: string;
};

export default function ScreenLayout({
  children,
  scrollable = false,
  withPadding = false,
  backgroundColor = '#fafefd',
}: ScreenLayoutProps) {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <Container
        style={[styles.container, withPadding && styles.padding]}
        contentContainerStyle={scrollable && styles.scrollContent}>
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
