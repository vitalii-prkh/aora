import React from "react";
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatListProps,
} from "react-native";
import {ResizeMode, Video} from "expo-av";
import * as Animatable from "react-native-animatable";
import {getLatestPosts} from "../lib/appwrite";
import {icons} from "../constants/icons";

type TrendingProps = {
  data: TrendingData[];
};

type TrendingItemProps = {
  activeItem: TrendingData["$id"] | null;
  item: TrendingData;
};

type TrendingData = Awaited<ReturnType<typeof getLatestPosts>>[number];

export function Trending(props: TrendingProps) {
  const [activeItem, setActiveItem] = React.useState<
    TrendingData["$id"] | null
  >(props.data[0]?.$id);
  const handleViewableItemsChanged: FlatListProps<TrendingData>["onViewableItemsChanged"] =
    (info) => {
      const {viewableItems} = info;

      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].item.$id);
      }
    };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
        />
      )}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{x: 150, y: 0}}
      onViewableItemsChanged={handleViewableItemsChanged}
      horizontal
    />
  );
}

const zoomIn: Animatable.CustomAnimation = {
  0: {
    transform: [{scale: 0.8}],
  },
  1: {
    transform: [{scale: 1.1}],
  },
};

const zoomOut: Animatable.CustomAnimation = {
  0: {
    transform: [{scale: 1.1}],
  },
  1: {
    transform: [{scale: 0.8}],
  },
};

function TrendingItem(props: TrendingItemProps) {
  const {item, activeItem} = props;
  const [play, setPlay] = React.useState(false);

  return (
    <Animatable.View
      className="mr-15"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play && (
        <Video
          source={{uri: item.video}}
          className="mt-3 h-72 w-52 rounded-[35px] bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (!status.isLoaded || status?.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      )}
      {!play && (
        <TouchableOpacity
          className="relative items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{uri: item.thumbnail}}
            className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
}
