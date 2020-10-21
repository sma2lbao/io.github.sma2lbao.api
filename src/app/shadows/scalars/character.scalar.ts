import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class CharacterImpl {
  name: string;
  avatar?: string;
  description?: string;

  constructor(name: string, avatar?: string, description?: string) {
    this.name = name;
    this.avatar = avatar;
    this.description = description;
  }
}

@Scalar('Character')
export class CharacterScalar
  implements CustomScalar<CharacterImpl, CharacterImpl> {
  description = 'character custom scalar type';

  parseValue(value: CharacterImpl): CharacterImpl {
    return value; // value from the client
  }

  serialize(value: CharacterImpl): CharacterImpl {
    return value; // value sent to the client
  }

  parseLiteral(ast: ValueNode): CharacterImpl {
    if (ast.kind === Kind.OBJECT) {
      const opts = ast.fields.map(field => {
        return {
          [field.name.value]: field.value,
        };
      });
      const { name, avatar, description } = opts as any;
      return new CharacterImpl(name, avatar, description);
    }
    return null;
  }
}
