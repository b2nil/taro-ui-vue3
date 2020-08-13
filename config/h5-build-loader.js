module.exports = function(source) {
    source = source.replace(/onTap:/gi, 'onClick:')
    source = source.replace(/('|")@tarojs\/components('|")/gi, "'@/utils/components'")
	return source
}