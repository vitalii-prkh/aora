import {FlatList, View} from "react-native";

type TrendingProps = {
  data: {$id: string}[];
};

export function Trending(props: TrendingProps) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <Text className="text-3xl text-white">{item.$id}</Text>
      )}
      horizontal
    />
  );
}
