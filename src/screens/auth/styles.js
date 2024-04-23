import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default styles;
