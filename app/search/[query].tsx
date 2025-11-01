import React from "react";
import {useLocalSearchParams} from "expo-router";
import {View, Text, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAppwrite} from "../../lib/useAppwrite";
import {getPostsByQuery} from "../../lib/appwrite";
import {EmptyState} from "../../components/EmptyState";
import {InputSearch} from "../../components/InputSearch";
import {VideoCard} from "../../components/VideoCard";

function ScreenSearch() {
  const {query} = useLocalSearchParams<{query: string}>();
  const {data: posts, refetch} = useAppwrite(getPostsByQuery, {query});

  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
        ListHeaderComponent={() => (
          <>
            <View className="my-6 flex px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="mt-1 font-psemibold text-2xl text-white">
                {query}
              </Text>

              <View className="mb-8 mt-6">
                <InputSearch initialQuery={query} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default ScreenSearch;
