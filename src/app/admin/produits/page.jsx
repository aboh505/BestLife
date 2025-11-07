'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '@/config/api';
import { Plus, Edit, Trash2, Search, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function ProductsManagement() {
  const { getToken } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    categorie: 'smartphone',
    prix: '',
    ancienPrix: '',
    description: '',
    descriptionLongue: '',
    stock: '',
    image: '',
    caracteristiques: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('upload'); // 'upload' or 'url'

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCTS);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 5MB)');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadMethod('upload');
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;

    setUploading(true);
    const token = getToken();
    const formDataObj = new FormData();
    formDataObj.append('image', imageFile);

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD_PRODUCT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });

      const data = await response.json();
      if (data.success) {
        return `${API_BASE_URL}${data.imageUrl}`;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erreur lors du téléchargement de l\'image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();

    try {
      // Upload image first if a file is selected
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
        if (!imageUrl) return; // Stop if upload failed
      }

      const url = editingProduct 
        ? API_ENDPOINTS.PRODUCT(editingProduct._id)
        : API_ENDPOINTS.PRODUCTS;
      
      const response = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          prix: Number(formData.prix),
          ancienPrix: Number(formData.ancienPrix) || null,
          stock: Number(formData.stock)
        })
      });

      const data = await response.json();
      
      if (data.success) {
        fetchProducts();
        setShowModal(false);
        resetForm();
        alert(editingProduct ? 'Produit modifié avec succès!' : 'Produit créé avec succès!');
      } else {
        alert(data.message || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erreur lors de la sauvegarde du produit');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) return;

    const token = getToken();
    try {
      const response = await fetch(API_ENDPOINTS.PRODUCT(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchProducts();
        alert('Produit supprimé avec succès!');
      } else {
        alert(data.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression du produit');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      marque: product.marque,
      categorie: product.categorie,
      prix: product.prix,
      ancienPrix: product.ancienPrix || '',
      description: product.description,
      descriptionLongue: product.descriptionLongue || '',
      stock: product.stock,
      image: product.image,
      caracteristiques: product.caracteristiques || []
    });
    setImageFile(null);
    setImagePreview(product.image);
    setUploadMethod('url');
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      nom: '',
      marque: '',
      categorie: 'smartphone',
      prix: '',
      ancienPrix: '',
      description: '',
      descriptionLongue: '',
      stock: '',
      image: '',
      caracteristiques: []
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadMethod('upload');
  };

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.marque.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold transition"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau Produit</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.nom}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.nom}</div>
                        <div className="text-sm text-gray-500">{product.marque}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                      {product.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {product.prix.toLocaleString()} FCFA
                    </div>
                    {product.ancienPrix && (
                      <div className="text-sm text-gray-500 line-through">
                        {product.ancienPrix.toLocaleString()} FCFA
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} unités
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Nom du produit</label>
                    <input
                      type="text"
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Marque</label>
                    <input
                      type="text"
                      required
                      value={formData.marque}
                      onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Catégorie</label>
                    <select
                      value={formData.categorie}
                      onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    >
                      <option value="smartphone">Smartphone</option>
                      <option value="electronique">Électronique</option>
                      <option value="immobilier">Immobilier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Stock</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Prix (FCFA)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.prix}
                      onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Ancien Prix (optionnel)</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.ancienPrix}
                      onChange={(e) => setFormData({ ...formData, ancienPrix: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-bold mb-2">Image du produit</label>
                  
                  {/* Toggle between upload and URL */}
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setUploadMethod('upload')}
                      className={`px-4 py-2 rounded-lg transition ${
                        uploadMethod === 'upload'
                          ? 'bg-yellow-500 text-black font-semibold'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Upload className="w-4 h-4 inline mr-2" />
                      Télécharger
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('url')}
                      className={`px-4 py-2 rounded-lg transition ${
                        uploadMethod === 'url'
                          ? 'bg-yellow-500 text-black font-semibold'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      URL
                    </button>
                  </div>

                  {uploadMethod === 'upload' ? (
                    <div>
                      {/* File Upload Area */}
                      <label className="block">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          {imagePreview ? (
                            <div className="space-y-3">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="mx-auto h-32 object-contain rounded"
                              />
                              <p className="text-sm text-gray-600">Cliquer pour changer l'image</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                Cliquer pour sélectionner une image
                              </p>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div>
                      {/* URL Input */}
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://exemple.com/image.jpg"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                        required={!imageFile}
                      />
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="mt-3 h-24 object-contain rounded border"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description courte</label>
                  <textarea
                    required
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description longue</label>
                  <textarea
                    rows="4"
                    value={formData.descriptionLongue}
                    onChange={(e) => setFormData({ ...formData, descriptionLongue: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    disabled={uploading}
                    className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                        Téléchargement...
                      </>
                    ) : (
                      editingProduct ? 'Modifier' : 'Créer'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
