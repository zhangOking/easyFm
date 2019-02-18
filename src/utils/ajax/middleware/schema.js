export default {
    'properties': {
        'data': {
            'type': 'object',
            'required': ['code', 'status', 'message', 'data', 'token'],
            'properties': {
                'code': {
                    'type': 'number'
                },
                'status': {
                    'type': 'number',
                    'enum': [0, 1]
                },
                'message': {
                    'type': 'string'
                },
                'data': {
                    'type': ['object', 'array']
                },
                'token': {
                    'type': 'string'
                }
            }
        }
    }
}
