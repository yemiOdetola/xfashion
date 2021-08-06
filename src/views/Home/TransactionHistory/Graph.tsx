import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { theme } from '../../../components';
import { Box, Theme } from '../../../components/Theme';

const { width: wWidth } = Dimensions.get('window');
const aspectRatio = 195 / 305;

const lerp = (v0: number, v1: number, t: number) => {
  return (1 - t) * v0 + t * v1;
}

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme['colors'];
}

interface GraphProps {
  data: DataPoint[];
}

const Graph = ({ data }: GraphProps) => {
  const width = wWidth - (theme.spacing.m * 2);
  const height = width * aspectRatio;
  const values = data.map(p => p.value);
  const dates = data.map(p => p.date);
  const step = width / data.length;
  const minX = Math.min(...dates);
  const maxX = Math.max(...dates);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);

  return (
    <Box
      width={width}
      height={height}
      marginTop="l"
    >
      {data.map((point, i) => {
        if (point.value === 0) {
          return null
        }
        return (
          <Box
            key={point.date}
            position="absolute"
            width={step}
            height={lerp(0, height, point.value / maxY)}
            left={i * step}
            bottom={0}
          >
            <Box
              position="absolute"
              top={0}
              bottom={0}
              left={theme.spacing.m}
              right={theme.spacing.m}
              backgroundColor={point.color}
              opacity={0.1}
              borderTopRightRadius="m"
              borderTopLeftRadius="m"
            />
            <Box
              position="absolute"
              top={0}
              left={theme.spacing.m}
              right={theme.spacing.m}
              height={32}
              backgroundColor={point.color}
              borderRadius="m"
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default Graph

const styles = StyleSheet.create({})
