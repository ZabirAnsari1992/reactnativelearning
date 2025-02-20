import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs} from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center w-20 mt-4">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }} // Fix tintColor here
      />
      <Text
        className={`${
          focused ? 'font-psemibold' : 'font-pregular'
        } text-xs`}
        style={{ color }} // Set color dynamically
      >
        {name}
      </Text>
    </View>
  );
};


const TabsLayout = () => {
  return (

    <Tabs
      screenOptions={{ tabBarShowLabel: false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor:'#CDCDE0',
        tabBarStyle:{
          backgroundColor:'#161622',
          borderTopWidth:1,
          borderTopColor:'#232533',
          height:84,
        }
       }}
    >
      <Tabs.Screen name='home' options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (<TabIcon
          icon={icons.home}
          color={color}
          name="Home"
          focused={focused}
        />
        )
      }}
      />
      <Tabs.Screen name='bookmark' options={{
        title: 'Bookmark',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (<TabIcon
          icon={icons.bookmark}
          color={color}
          name="Bookmark"
          focused={focused}
        />
        )
      }}
      />
      <Tabs.Screen name='create' options={{
        title: 'Create',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (<TabIcon
          icon={icons.plus}
          color={color}
          name="Create"
          focused={focused}
        />
        )
      }}
      />
      <Tabs.Screen name='profile' options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (<TabIcon
          icon={icons.profile}
          color={color}
          name="Profile"
          focused={focused}
        />
        )
      }}
      />
    </Tabs>
  )
}

export default TabsLayout