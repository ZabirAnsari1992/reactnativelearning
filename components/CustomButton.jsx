// import {TouchableOpacity ,Text } from 'react-native'
// import React from 'react'

// const CustomButton = ({title, handlePress, containerStyles,textStyles,isLoading}) => {
//   return (
//     <TouchableOpacity 
//     onPress={handlePress}
//     activeOpacity={0.7}
//     className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} 
//     ${isLoading ? 'opacity-50':''}`}
//     disabled={isLoading}
//     >
//       <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
//     </TouchableOpacity>
//   )
// }

// export default CustomButton



import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: isLoading ? "#FF572280" : "#FF5722",
          borderRadius: 10,
          minHeight: 62,
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text style={[{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
