package com.controle.chamados.repository;

import com.controle.chamados.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, String>
{
}
