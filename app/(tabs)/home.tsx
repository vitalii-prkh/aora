import {useState} from "react";
import {View, FlatList, Text, Image, RefreshControl} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {images} from "../../constants/images";
import {InputSearch} from "../../components/InputSearch";
import {Trending} from "../../components/Trending";
import {EmptyState} from "../../components/EmptyState";
import {VideoCard} from "../../components/VideoCard";
import {getAllPosts, getLatestPosts} from "../../lib/appwrite";
import {useAppwrite} from "../../lib/useAppwrite";

function ScreenHome() {
  const [refreshing, setRefreshing] = useState(false);

  const {data, refetch} = useAppwrite(getAllPosts);
  const {data: latest} = useAppwrite(getLatestPosts);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={data}
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
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6 px-4">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  The User
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <InputSearch />
            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="mb-3 font-pregular text-lg text-gray-100">
                Latest Videos
              </Text>
              <Trending data={latest} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}

export default ScreenHome;
