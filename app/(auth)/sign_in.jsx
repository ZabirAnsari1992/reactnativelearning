import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, SignIn as signInUser } from '../../lib/appwrite'; // Renamed to avoid conflict

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      return Alert.alert('Error', 'Please fill all the fields');
    }

    setIsSubmitting(true);

    try {
      const session = await signInUser(form.email, form.password);
      if (!session) throw new Error("Failed to create session");

      const result = await getCurrentUser();
      if (!result) throw new Error("Failed to fetch user data");

      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace('/home');
    } catch (error) {
      console.error("Sign-in error:", error);
      Alert.alert('Error', error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10">Log in to Aura</Text>

          <FormField
            title="Email"
            placeholder="Enter Your Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />
          <CustomButton title="Sign In" handlePress={submit} containerStyles="" isLoading={isSubmitting} />

          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-regular">Don't have an account?</Text>
            <Link className="text-lg font-semibold text-secondary" href="/sign_up">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
