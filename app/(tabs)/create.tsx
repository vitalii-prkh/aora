import {useState} from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {ResizeMode, Video} from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import {icons} from "../../constants/icons";
import {useGlobalContext} from "../../context/GlobalProvider";
import {createVideoPost} from "../../lib/appwrite";
import {FormField} from "../../components/FormField";
import {CustomButton} from "../../components/CustomButton";

type TFormState = {
  title: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
};

function ScreenCreate() {
  const {user} = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<TFormState>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const handleOpen = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      form.thumbnail != null ||
      form.video != null
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);

    try {
      await createVideoPost({
        ...form,
        video: form.video!,
        thumbnail: form.thumbnail!,
        userId: user?.$id!,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="my-6 px-4">
        <Text className="font-psemibold text-2xl text-white">Upload Video</Text>
        <FormField
          label="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          onChange={(e) => setForm({...form, title: e})}
          className="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => handleOpen("video")}>
            {form.video ? (
              <Video
                source={{uri: form.video.uri}}
                className="h-64 w-full rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="flex h-40 w-full items-center justify-center rounded-2xl border border-black-200 bg-black-100 px-4">
                <View className="flex h-14 w-14 items-center justify-center border border-dashed border-secondary-100">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="h-1/2 w-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => handleOpen("image")}>
            {form.thumbnail ? (
              <Image
                source={{uri: form.thumbnail.uri}}
                resizeMode="cover"
                className="h-64 w-full rounded-2xl"
              />
            ) : (
              <View className="flex h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 border-black-200 bg-black-100 px-4">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="h-5 w-5"
                />
                <Text className="font-pmedium text-sm text-gray-100">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          label="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          onChange={(e) => setForm({...form, prompt: e})}
          className="mt-7"
        />
        <CustomButton
          onPress={submit}
          containerClassName="mt-7"
          isLoading={uploading}
        >
          Submit & Publish
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ScreenCreate;
