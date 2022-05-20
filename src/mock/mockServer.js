/**
 * 利用mockjs提供mock接口
 */
import Mock from 'mockjs'
import recommends from './recommends.json'
import floors from './floors.json'
import ranks from './ranks.json'
import likes from './likes.json'

Mock.mock('/mock/recommends', {
	code: 200,
	data: recommends
})
Mock.mock('/mock/floors', {
	code: 200,
	data: floors
})
Mock.mock('/mock/ranks', {
	code: 200,
	data: ranks
})
Mock.mock('/mock/likes', {
	code: 200,
	data: likes
})
