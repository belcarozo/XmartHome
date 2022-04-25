import React from 'react'
import { FlatList } from 'react-native'
import { styles } from './styles'

interface DragToSortProps {
  numColumns?: number
  data: any[]
  renderItem: (item: any) => JSX.Element
}

export const DragToSort: React.FC<DragToSortProps> = ({
  numColumns = 2,
  renderItem,
  data,
}) => {
  return (
    <>
      <FlatList
        renderItem={renderItem}
        data={data}
        numColumns={numColumns}
        contentContainerStyle={{ height: 700 }}
        // columnWrapperStyle={{
        //   justifyContent: 'space-between',
        //   marginBottom: 20,
        // }}
      />
    </>
  )
}
