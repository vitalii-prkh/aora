import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {View, Image, FlatList, TouchableOpacity} from "react-native";
import {icons} from "../../constants/icons";
import {useAppwrite} from "../../lib/useAppwrite";
import {getPostsByUserId, signOut} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";
import {EmptyState} from "../../components/EmptyState";
import {InfoBox} from "../../components/InfoBox";
import {VideoCard} from "../../components/VideoCard";

function ScreenProfile() {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts} = useAppwrite(getPostsByUserId, {userId: user?.$id!});
  const logout = async () => {
    await signOut();

    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="mb-12 mt-6 flex w-full items-center justify-center px-4">
            <TouchableOpacity
              onPress={logout}
              className="mb-10 flex w-full items-end"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="h-6 w-6"
              />
            </TouchableOpacity>

            <View className="flex h-16 w-16 items-center justify-center rounded-lg border border-secondary">
              <Image
                source={{uri: user?.avatar}}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              titleClassName="text-lg"
              containerClassName="mt-5"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleClassName="text-xl"
                containerClassName="mr-10"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleClassName="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default ScreenProfile;
